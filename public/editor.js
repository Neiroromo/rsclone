const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: 'editorjs',
  tools: {
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:8000/api/v1/articles/upload', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url не работает пока что
        },
      },
    },
    header: {
      class: Header,
      config: {
        placeholder: 'Enter a header',
        levels: [2, 3, 4],
        defaultLevel: 3,
      },
    },
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
      },
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    raw: RawTool,
    list: {
      class: List,
      inlineToolbar: true,
    },
    embed: Embed,
    quote: Quote,
  },
});
