(function () {
    'use strict';

    const configElement = document.getElementById('app-config');
    let config = {};
    try {
        config = JSON.parse(configElement ? configElement.textContent : '{}');
    } catch (error) {
        console.error('Unable to parse application configuration.', error);
    }

    const profile = config.profile || {};
    const terminal = config.terminal || { user: '', host: '' };
    const output = document.getElementById('terminal-output');
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    if (!output || !form || !input) return;

    const welcomeTemplate = output.cloneNode(true);
    const commandHistory = [];
    const maxHistorySize = 50;
    let historyIndex = -1;

    function addLine(text, className) {
        const line = document.createElement('div');
        line.className = className || 'output-line';
        line.textContent = text;
        output.appendChild(line);
    }

    function addPrompt(command) {
        const line = document.createElement('div');
        line.className = 'terminal-row command-row d-flex align-items-baseline';
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        const userSpan = document.createElement('span');
        userSpan.className = 'prompt-user';
        userSpan.textContent = terminal.user;
        const hostSpan = document.createElement('span');
        hostSpan.className = 'prompt-host';
        hostSpan.textContent = terminal.host;
        promptSpan.append(userSpan, document.createTextNode('@'), hostSpan, document.createTextNode(':~$'));
        line.append(promptSpan, document.createTextNode(' ' + command));
        output.appendChild(line);
    }

    function addKeyValue(label, value) {
        const line = document.createElement('p');
        line.className = 'key-value';
        const labelSpan = document.createElement('span');
        labelSpan.className = 'key-label';
        labelSpan.textContent = label;
        line.append(labelSpan, document.createTextNode(value));
        output.appendChild(line);
    }

    function renderHelp() {
        addLine('Available commands:', 'highlight');
        commandDefinitions.forEach(function (item) {
            const line = document.createElement('p');
            line.className = 'command-help';
            const command = document.createElement('span');
            command.className = 'command';
            command.textContent = item.name;
            line.append(command, document.createTextNode(item.description));
            output.appendChild(line);
        });
    }

    function renderAbout() {
        addKeyValue('Name       : ', profile.name || '');
        addKeyValue('University : ', profile.university || '');
        addKeyValue('Major      : ', profile.major || '');
        addKeyValue('Email      : ', profile.email || '');
    }

    function renderEducation() {
        addKeyValue('University : ', profile.university || '');
        addKeyValue('Major      : ', profile.major || '');
    }

    function renderEmail() {
        if (!profile.email) {
            addLine('Email address is not configured.', 'error-line');
            return;
        }
        const line = document.createElement('p');
        line.className = 'output-line';
        line.textContent = 'Email: ';
        const link = document.createElement('a');
        link.href = 'mailto:' + profile.email;
        link.textContent = profile.email;
        line.appendChild(link);
        output.appendChild(line);
    }

    function renderWelcome() {
        output.replaceChildren(welcomeTemplate.cloneNode(true));
    }

    function clearTerminal() {
        output.replaceChildren();
    }

    function renderHistory() {
        commandHistory.forEach(function (item, index) {
            addLine((index + 1) + '  ' + item);
        });
    }

    const commandDefinitions = [
        { name: 'about', description: 'show profile information', handler: renderAbout },
        { name: 'education', description: 'show university and major', handler: renderEducation },
        { name: 'email', description: 'send an email to me', handler: renderEmail },
        { name: 'clear', description: 'clear the terminal', handler: clearTerminal },
        { name: 'history', description: 'view command history', handler: renderHistory },
        { name: 'help', description: 'show available commands', handler: renderHelp },
        { name: 'welcome', description: 'restore the welcome screen', handler: renderWelcome }
    ];

    const commandMap = Object.fromEntries(commandDefinitions.map(function (definition) {
        return [definition.name, definition];
    }));

    function runCommand(rawCommand) {
        const command = rawCommand.trim().toLowerCase();
        if (!command) return;

        addPrompt(rawCommand.trim());
        const definition = commandMap[command];
        if (!definition) {
            addLine(command + ': command not found. Type help for available commands.', 'error-line');
        } else {
            definition.handler();
        }
        if (command === 'clear' || command === 'welcome') {
            return;
        }
        window.scrollTo(0, document.body.scrollHeight);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const command = input.value.trim();
        if (!command) return;
        commandHistory.unshift(command);
        if (commandHistory.length > maxHistorySize) commandHistory.pop();
        historyIndex = -1;
        input.value = '';
        runCommand(command);
    });

    input.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (historyIndex < commandHistory.length - 1) historyIndex += 1;
            input.value = commandHistory[historyIndex] || '';
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (historyIndex > 0) historyIndex -= 1;
            else historyIndex = -1;
            input.value = commandHistory[historyIndex] || '';
        } else if (event.key === 'Tab') {
            event.preventDefault();
            const match = commandDefinitions.map(function (definition) { return definition.name; }).find(function (name) {
                return name.indexOf(input.value.toLowerCase()) === 0;
            });
            if (match) input.value = match;
        }
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('a')) input.focus();
    });
}());
