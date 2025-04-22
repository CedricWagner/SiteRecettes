const { useEffect, useState } = require("react");

export function usePageTitle() {
  const defaultPageTitle = "Les Véganeries de Dodo";
  const [pageTitle, setPageTitle] = useState(defaultPageTitle);

  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle + " - " + defaultPageTitle;
    } else {
      document.title = defaultPageTitle;
    }
  }, [pageTitle]);

  return setPageTitle;
}