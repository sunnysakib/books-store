
const book = JSON.parse(localStorage.getItem('selectedBook'));
const bookDetailsDiv = document.getElementById('bookDetails');

if (book) {
    bookDetailsDiv.innerHTML = `
        <div  class="book-details">
            <div>
            <img class="book-image" src="${book.formats['image/jpeg'] ? book.formats['image/jpeg'] : 'https://via.placeholder.com/150'}" alt="${book.title}">
            <div >
                <h2>${book.title}</h2>
                <div class="book-info">
                    <p><strong>Author:</strong> ${book.authors.map(author => author.name).join(', ')}</p>
                    <p><strong>Published:</strong> ${book.publish_date || 'Unknown'}</p>
                    <p><strong>Languages:</strong> ${book.languages || 'Unknown'}</p>
                    <p><strong>Copyright:</strong> ${book.copyright ? "Yes" : "No"}</p>
                    <p><strong>Genre:</strong> ${book.subjects[0] || 'Unknown'}</p>
                    <p><strong>Subject:</strong> ${book.bookshelves[0] || 'Unknown'}</p>
                    <p><strong>Downloaded:</strong> ${book.download_count + " times" || 'Unknown'}</p>
                </div>
            </div>
        </div>
            <p class="description"><strong>Description:</strong> ${book.description || 'No description available.'}</p>
        </div>
    `;
} else {
    bookDetailsDiv.innerHTML = '<p>No book details available.</p>';
}
