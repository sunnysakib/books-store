let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const wishlistBooks = document.getElementById('wishlistBooks');


function displayWishlist() {
    wishlistBooks.innerHTML = wishlist.length > 0 ? wishlist.map(book => {
        let convertedStr = book.title.replace(/ /g, "-").trim();
        return `
            <a href="bookdetails.html?title=${convertedStr}" class="book" onclick='viewBookDetails(${book.id})'>
                <img src="${book.formats['image/jpeg'] ? book.formats['image/jpeg'] : 'https://via.placeholder.com/150'}" alt="${book.title}">
                <p class="title">${book.title}</p>
                <p class="author">${book.authors.map(author => author.name).join(', ')}</p>
                 
                <button class="wishlist-btn heart" onclick='removeFromWishlist(event, ${book.id})'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff0000" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                </button>
            </a>
        `;
    }).join('') : '<p>Your wishlist is empty.</p>';
}


function viewBookDetails(bookId) {
    const book = wishlist.find(b => b.id === bookId);
    localStorage.setItem('selectedBook', JSON.stringify(book));
   
}

function removeFromWishlist(event, bookId) {
    event.stopPropagation();
    wishlist = wishlist.filter(book => book.id !== bookId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayWishlist();
}

displayWishlist();
