const convertToBookButtons = document.querySelectorAll('.convert-to-book');
const returnToBlogButtons = document.querySelectorAll('.return-to-blog');

convertToBookButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const article = this.closest('article');
    const bookContent = article.querySelector('.book-content');
    bookContent.innerHTML = article.innerHTML;

    // Remove the "Convert to Book" button from the content
    const buttonToRemove = bookContent.querySelector('.convert-to-book');
    buttonToRemove.parentNode.removeChild(buttonToRemove);

    // Generate the book using Bindery.js
    Bindery.makeBook({
      content: bookContent,
      view: Bindery.View.PREVIEW,
      pageSetup: {
        size: { width: '5.5in', height: '8.5in' },
        margin: { top: '0.5in', inner: '0.5in', outer: '0.5in', bottom: '0.5in' },
      },
      printSetup: {
        layout: Bindery.Layout.PAGES,
        paper: Bindery.Paper.AUTO,
      },
    });

    // Hide the original content and show the book content
    Array.from(article.children).forEach(child => {
      if (child !== bookContent) {
        child.style.display = 'none';
      }
    });
    bookContent.style.display = 'block';

    // Show the "Return to Blog" button
    const returnToBlogButton = article.querySelector('.return-to-blog');
    returnToBlogButton.style.display = 'block';
  });
});


