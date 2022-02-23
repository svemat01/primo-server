import('https://medv.io/finder/finder.js').then((m) => ({ finder } = m));

let shouldRun = true;

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');

    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.append(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const message = successful ? 'successful' : 'unsuccessful';

        console.log('Fallback: Copying text command was ' + message);
    } catch (error) {
        console.error('Fallback: Oops, unable to copy', error);
    }

    textArea.remove();
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);

        return;
    }

    navigator.clipboard.writeText(text).then(
        () => {
            console.log('Async: Copying to clipboard was successful!');
        },
        (error) => {
            console.error('Async: Could not copy text:', error);
        }
    );
}

document.addEventListener('click', (event) => {
    if (!shouldRun) return;
    const selector = finder(event.target);

    copyTextToClipboard(selector);
    console.log(selector);
});
