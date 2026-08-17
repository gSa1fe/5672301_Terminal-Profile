<?php
declare(strict_types=1);

$profile = [
    'name' => 'Yannawut Panjaruan',
    'university' => 'Lampang Rajabhat University',
    'email' => 'yannawutpanjaruan@gmail.com',
    'major' => 'Software Engineer',
    'github' => 'https://github.com/gSa1fe/5672301_Terminal-Profile',
];

$terminal = [
    'user' => 'visitor',
    'host' => 'terminal.yannawut.dev',
];

function loadAsciiAsset(string $path): string
{
    if (!is_readable($path)) {
        error_log('ASCII asset is not readable: ' . $path);
        return '';
    }

    $content = file_get_contents($path);
    if ($content === false) {
        error_log('Unable to read ASCII asset: ' . $path);
        return '';
    }

    return htmlspecialchars($content, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$ascii = [
    'titleDesktop' => loadAsciiAsset(__DIR__ . '/assets/ascii/title-desktop.txt'),
    'titleMobile' => loadAsciiAsset(__DIR__ . '/assets/ascii/title-mobile.txt'),
    'art' => loadAsciiAsset(__DIR__ . '/assets/ascii/art.txt'),
];
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' https://cdn.jsdelivr.net; script-src 'self'; img-src 'self' data:; font-src 'self'; base-uri 'self'; form-action 'self'">
    <meta name="description" content="Self-introduction page for Yannawut Panjaruan">
    <title><?= htmlspecialchars($profile['name']) ?> | Terminal Profile</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <main class="profile-shell container-fluid text-start">
        <?php require __DIR__ . '/components/profile-card.php'; ?>
    </main>

    <script id="app-config" type="application/json"><?= json_encode(['profile' => $profile, 'terminal' => $terminal], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_THROW_ON_ERROR) ?></script>
    <script src="assets/js/terminal.js" defer></script>
</body>
</html>
