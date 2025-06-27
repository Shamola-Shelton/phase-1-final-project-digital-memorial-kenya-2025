# Kenyan Protest Victims Memorial (2024–2025)

This project is a web-based memorial dedicated to honoring the victims of the 2024–2025 Kenyan protests against the Finance Bill. It provides a platform to view victim profiles, submit tributes, explore a timeline of key events, and access related resources. The site aims to preserve the memory of those lost, raise awareness, and foster community engagement through tributes.

## Table of Contents

- Features
- Technologies
- Setup
- File Structure
- Usage
- Contributing
- License

## Features

- **Memorial Wall**: Displays profiles of victims with their names, ages, stories, and photos.
- **Tribute Submission**: Allows users to submit tributes with a victim selection, name, and message. Tributes are displayed immediately, with edit and delete options.
- **Timeline**: Visualizes key protest events with dates, descriptions, and links, filterable by type (protest or memorial).
- **Resources**: Provides links to articles and organizations related to the protests.
- **Responsive Design**: Mobile-friendly layout using CSS Grid and media queries.
- **CRUD Operations**: Supports creating, reading, updating, and deleting tributes via a JSON Server backend.
- **Accessibility**: Includes ARIA labels for improved screen reader compatibility.

## Technologies

- **HTML5**: Structure for web pages.
- **CSS3**: Styling with custom properties, flexbox, and grid for responsive design.
- **JavaScript (ES6)**: Client-side logic for fetching data, form handling, and CRUD operations.
- **JSON Server**: Mock REST API for storing and managing victims, tributes, and events data.
- **Fonts**: Google Fonts (Merriweather and Lora) for typography.

## Setup

To run the project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/kenyan-protest-victims-memorial.git
   cd kenyan-protest-victims-memorial
   ```

2. **Install Dependencies**: Ensure you have Node.js installed, then install JSON Server globally:

   ```bash
   npm install -g json-server
   ```

3. **Start JSON Server**: Run the mock API using the provided `db.json` file:

   ```bash
   json-server --watch db.json
   ```

   The API will be available at `http://localhost:3000`.

4. **Serve the Website**: Use a local web server (e.g., Live Server in VS Code or `http-server`):

   ```bash
   npm install -g http-server
   http-server
   ```

   Alternatively, open `index.html` directly in a browser, but ensure JSON Server is running for API calls.

5. **Access the Site**: Open `http://localhost:8080` (or the port provided by your server) in a web browser.

## File Structure

```
kenyan-protest-victims-memorial/
├── css/
│   └── styles.css          # Global styles for the website
├── src/
│   ├── index.js           # Logic for Memorial Wall
│   ├── tributes.js        # Logic for tribute submission and CRUD operations
│   ├── timeline.js        # Logic for timeline display and filtering
│   └── resources.js       # Logic for resources page
├── index.html             # Memorial Wall page
├── tributes.html          # Tribute submission and display page
├── timeline.html          # Timeline of protest events
├── resources.html         # Resources page
├── db.json                # Mock database for victims, tributes, and events
└── README.md              # Project documentation
```

## Usage

- **Memorial Wall (**`index.html`**)**: View victim profiles with details and photos. Use the search bar to filter by name.
- **Submit Tribute (**`tributes.html`**)**: Select a victim, enter an optional name and a message, and submit. Tributes appear immediately in a grid below the form with options to edit or delete.
- **Timeline (**`timeline.html`**)**: Browse key protest events with descriptions and links. Filter by event type (protest or memorial).
- **Resources (**`resources.html`**)**: Access external links and information about the protests.
- **CRUD Operations**:
  - **Create**: Submit a tribute via the form, which is added to `db.json` and displayed instantly.
  - **Read**: All tributes (approved or pending) are fetched and displayed on page load.
  - **Update**: Click "Edit" on a tribute to modify its message or author, saving changes to the API.
  - **Delete**: Click "Delete" to remove a tribute after confirmation.

### Notes

- Tributes are stored with an `approved: false` status by default. To display only approved tributes elsewhere (e.g., Memorial Wall), modify the fetch logic to filter by `approved: true`.
- Image uploads are disabled due to JSON Server limitations. For production, consider a backend like Node.js with Multer or a cloud storage solution (e.g., AWS S3).
- The site uses a dark theme with a blue gradient, red headings, and gold accents, inspired by Kenyan protest imagery.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request with a description of your changes.

Please ensure code follows the existing style (e.g., consistent CSS properties, ES6 syntax) and includes tests if applicable. For major changes, open an issue first to discuss.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## *Dedicated to the memory of those lost in the 2024–2025 Kenyan protests. May their stories inspire justice and change.*