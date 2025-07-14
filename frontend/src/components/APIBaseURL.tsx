export function getAPIBaseURL(): string {
  if (process.env.NODE_ENV != "development") {
    return "http://hopethiswork:5000/api/";
  } else {
    return "http://localhost:5000/api/";
  }
}
