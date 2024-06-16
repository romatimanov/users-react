export const fetchModule = async (uri: string) => {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function fetchAnsfer(isLoading: boolean, isError: boolean) {
  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (isError) {
    return <div className="container">Error: Something went wrong</div>;
  }

  return null;
}
