const API_URL = 'https://gutendex.com/books/';
let currentPage = 1;
let books = [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const searchBar = document.getElementById('searchBar');
const genreFilter = document.getElementById('genreFilter');
const bookList = document.getElementById('bookList');
const wishlistBooks = document.getElementById('wishlistBooks');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const loadingIndicator = document.getElementById('loading');
const searchInput = document.getElementById('search-bar');
const pagination = document.getElementById('pagination');
const pageNumber = document.getElementById('currentPage');


// Fetch books from the API
async function fetchBooks(page = 1, search = '', topic = '') {
    bookList.style.display = 'none';
    pagination.style.display = 'none';
    loadingIndicator.style.display = 'flex';
    let url = '';
    if (page !== null && search === '' && topic === '') {
        url = `${API_URL}?page=${page}`;
    }
    if (page !== null && search === '' && topic !== '') {
        url = `${API_URL}?page=${page}&topic=${topic}`;
    }
    if (page === null && search !== '' && topic === '') {
        url = `${API_URL}?search=${search}`;
    }
    if (search !== '' && topic !== '') {
        url = `${API_URL}?search=${search}&topic=${topic}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        books = data.results;
        displayBooks();
        
    } catch (error) {
        console.error('Error fetching books:', error);
    } finally {
        loadingIndicator.style.display = 'none';
        bookList.style.display = 'flex';
        if (search === '') {
            pagination.style.display = 'flex';
        }
    }
}

// Display books in the DOM
function displayBooks() {
    bookList.innerHTML = books.length > 0 ? books.map(book => `
        <div class="book">
            <img src="${book.formats['image/jpeg'] ? book.formats['image/jpeg'] : 'https://via.placeholder.com/150'}" alt="${book.title}">
            <p class="title">${book.title}</p>
            <p class="author">${book.authors.map(author => author.name).join(', ')}</p>
             ${wishlist.some(w => w.id === book.id) ? ` 
            <button class="wishlist-btn heart" onclick='toggleWishlist(${book.id})'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff0000" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>` :
            `<button class="wishlist-btn" onclick='toggleWishlist(${book.id})'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>`}
        </div>
    `).join('') : '<p>No books found.</p>';
}



function toggleWishlist(bookId) {
    const book = books.find(b => b.id === bookId);

    const isBookInWishlist = wishlist.some(item => item.id === book.id);

    if (isBookInWishlist) {
        wishlist = wishlist.filter(item => item.id !== book.id);
    } else {
        wishlist.push(book);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    displayBooks();
}


// Search functionality
searchBar.addEventListener('input', function () {
    let convertedStr = searchBar.value.replace(/ /g, "%20").trim();
    fetchBooks(null, convertedStr, genreFilter.value);
});

// genre filter 
genreFilter.addEventListener('change', function () {
    let convertedStr = searchBar.value.replace(/ /g, "%20").trim();
    fetchBooks(currentPage, convertedStr, genreFilter.value);
});


// Pagination functionality
nextPageBtn.addEventListener('click', function () {
    currentPage++;
    pageNumber.textContent = currentPage;
    fetchBooks(currentPage, searchBar.value, genreFilter.value);
});

prevPageBtn.addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        pageNumber.textContent = currentPage;
        fetchBooks(currentPage, searchBar.value, genreFilter.value);
    }
});

fetchBooks();
