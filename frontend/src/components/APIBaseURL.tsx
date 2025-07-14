export function getAPIBaseURL(): string {
  if (process.env.NODE_ENV != "development") {
    return "http://hopethiswork.com:5000/api/";
  } else {
    return "http://localhost:5000/api/";
  }
}
