export function generateEmailHtml(title: string, url: string): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Blog Post Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            padding-bottom: 20px;
        }
        .email-header img {
            max-width: 150px;
        }
        .email-body {
            padding: 20px;
            text-align: center;
        }
        .email-body h2 {
            color: #333333;
        }
        .email-body p {
            color: #555555;
        }
        .email-body a {
            color: #007BFF;
            text-decoration: none;
        }
        .email-footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #888888;
        }
        .email-footer a {
            color: #007BFF;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
        </div>
        <div class="email-body">
            <h2>New Blog Post Alert!</h2>
            <p>Hi Reader,</p>
            <p>We're excited to let you know about our latest blog post:</p>
            <h3>${title}</h3>
            <p>Click the link below to read the full article:</p>
            <p><a href="${url}" target="_blank">Read Now</a></p>
            <p>Thank you for subscribing!</p>
            <p>Best regards,<br>Pranshu Singh Bisht</p>
        </div>
        <div class="email-footer">
            <p>If you wish to unsubscribe from these emails, you can do so <a href="pranshu.tech">here</a>.</p>
        </div>
    </div>
</body>
</html>
  `
}
