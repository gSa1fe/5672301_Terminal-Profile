    <section class="terminal-app d-flex flex-column" aria-label="Interactive terminal portfolio">
        <div id="terminal-output" class="terminal-output w-100" role="log" aria-live="polite" aria-relevant="additions text">
            <div class="terminal-row command-row d-flex align-items-baseline"><span class="prompt"><span class="prompt-user"><?= htmlspecialchars($terminal['user'], ENT_QUOTES, 'UTF-8') ?></span>@<span class="prompt-host"><?= htmlspecialchars($terminal['host'], ENT_QUOTES, 'UTF-8') ?></span>:~$</span> welcome</div>
            <div class="hero-grid">
                <div class="hero-copy">
                    <pre class="ascii-logo ascii-logo-desktop" aria-label="YannawutPanjaruan"><?= $ascii['titleDesktop'] ?></pre>
                    <pre class="ascii-logo ascii-logo-mobile" aria-label="Yannawut Panjaruan"><?= $ascii['titleMobile'] ?></pre>
                    <p class="welcome-title">Welcome to my terminal portfolio. (Version 1.0.0)</p>
                    <p class="rule">----</p>
                    <p>This project is a personal introduction page built with PHP.</p>
                    <p>My source code can be found in this project's <a href="<?= htmlspecialchars($profile['github'], ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener noreferrer">GitHub repo</a>.</p>
                    <p class="rule">----</p>
                    <p>For a list of available commands, type <span class="accent">'help'</span>.</p>
                </div>
                <pre class="ascii-art" aria-label="ASCII art"><?= $ascii['art'] ?></pre>
            </div>
        </div>

        <form id="terminal-form" class="terminal-form d-flex align-items-baseline w-100" autocomplete="off">
            <label class="prompt" for="terminal-input"><span class="prompt-user"><?= htmlspecialchars($terminal['user'], ENT_QUOTES, 'UTF-8') ?></span>@<span class="prompt-host"><?= htmlspecialchars($terminal['host'], ENT_QUOTES, 'UTF-8') ?></span>:~$</label>
            <input id="terminal-input" name="command" type="text" spellcheck="false" autofocus aria-label="Terminal command">
        </form>
    </section>
