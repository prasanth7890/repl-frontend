const folderStructureData = {
  name: "root",
  isFolder: true,
  items: [
    {
      name: "index.html",
      isFolder: false,
    },
    {
      name: "app",
      isFolder: true,
      items: [
        {
          name: "app.js",
          isFolder: false,
        },
        {
          name: "src",
          isFolder: true,
          items: [
            {
              name: "main.jsx",
              isFolder: false,
            },
            {
              name: "utils.js",
              isFolder: false,
            },
          ],
        },
        {
          name: "app.css",
          isFolder: false,
        },
      ],
    },
  ],
};

export default folderStructureData;
