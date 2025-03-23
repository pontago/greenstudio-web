<?php
namespace Main {
    mb_language('Japanese');
    mb_internal_encoding('UTF-8');

    const STATUS_OK = 'ok';
    const STATUS_NG = 'ng';

    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    if ($_SERVER['SERVER_NAME'] === 'localhost') {
        header('Access-Control-Allow-Origin: *');
    }

    /*
     * reCAPTCHAの検証
    */
    function checkRecaptcha($token): bool
    {
        if (empty($token)) {
            return false;
        }

        $payload = http_build_query([
            'secret' => $_ENV['RECAPTCHA_SECRET_KEY'] ?: $_SERVER['RECAPTCHA_SECRET_KEY'],
            'response' => $token
        ]);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        $result = json_decode($response);

        if ($result === null || !$result->success) {
            return false;
        }

        // スコア判定
        if ($result->score < 0.5) {
            return false;
        }

        return true;
    }

    /*
     * バリデーション
    */
    function validate($data): array
    {
        $errors = [];
        $fields = ['name' => 'お名前', 'email' => 'メールアドレス', 'message' => '本文'];
        foreach ($fields as $key => $field) {
            if (!isset($data[$key]) || trim($data[$key]) === '') {
                $errors[$key] = ["${$field}が入力されていません。"];
            }
        }

        if (count($errors) > 0) {
            return $errors;
        }

        if ((!is_string($data['name']) || mb_strlen($data['name']) > 100)) {
            $errors['name'] = ["${fields['name']}は100文字以内で入力してください。"];
        }

        // Zodのemail正規表現と合わせる
        $pattern = '/^(?!\.)(?!.*\.\.)([A-Z0-9\'+\-\.]*)[A-Z0-9_+\-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i';
        if ((!is_string($data['email']) || preg_match($pattern, $data['email']) === 0)) {
            $errors['email'] = ["${fields['email']}の形式が正しくありません。"];
        }

        if ((!is_string($data['message']) || mb_strlen($data['message']) > 10000)) {
            $errors['message'] = ["${fields['message']}は10000文字以内で入力してください。"];
        }

        return $errors;
    }

    /*
     * メール送信
    */
    function sendmail($data): bool
    {
        $toEmail = 'info@greenstudio.jp';
        $subject = 'お問い合わせがありました';
        $confirmSubject = 'お問い合わせを受け付けました（自動返信）';
        $body =<<<EOM
下記の内容でお問い合わせがありました。

【お名前】
{$data['name']}
【メールアドレス】
{$data['email']}
【本文】
{$data['message']}
EOM;
        $confirmBody =<<<EOM
お問い合わせありがとうございます。
下記の内容でお問い合わせを受け付けました。

【お名前】
{$data['name']}
【メールアドレス】
{$data['email']}
【本文】
{$data['message']}

----
GREEN STUDIO
https://www.greenstudio.jp/
EOM;

        $headers = [
            'MIME-Version' => '1.0',
            'Content-Transfer-Encoding' => 'base64',
            'Content-Type' => 'text/plain; charset=UTF-8',
            'From' => "GREEN STUDIO <$toEmail>"
        ];

        // お問い合わせ確認用メール（自動返信）
        $confirmResult = mb_send_mail(
            $data['email'],
            $confirmSubject,
            $confirmBody,
            $headers,
            "-f$toEmail"
        );
        if ($confirmResult === false) {
            return false;
        }

        // 管理者へ
        $result = mb_send_mail(
            $toEmail,
            $subject,
            $body,
            $headers + ['Reply-To' => $data['email']
            ],
            "-f$toEmail"
        );
        return $result;
    }


    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        exit(json_encode(['status' => STATUS_NG, 'message' => 'Only POST requests are allowed.']));
    }

    try {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (!is_array($data)) {
            http_response_code(400);
            exit(json_encode(['status' => STATUS_NG, 'message' => 'Invalid JSON']));
        }

        $errors = validate($data);
        if (!empty($errors)) {
            http_response_code(400);
            exit(json_encode(['status' => STATUS_NG, 'errors' => $errors]));
        }

        $verified = checkRecaptcha($data['g-recaptcha-response']);
        if (!$verified) {
            http_response_code(400);
            exit(json_encode(['status' => STATUS_NG, 'message' => 'reCAPTCHAの検証に失敗しました。']));
        }

        $result = sendmail($data);
        if ($result === false) {
            http_response_code(500);
            exit(json_encode(['status' => STATUS_NG, 'message' => '送信に失敗しました。']));
        }

        http_response_code(200);
        exit(json_encode(['status' => STATUS_OK]));
    } catch (\Exception $e) {
        http_response_code(500);
        exit(json_encode(['status' => STATUS_NG, 'message' => 'Internal Server Error']));
    }
}
