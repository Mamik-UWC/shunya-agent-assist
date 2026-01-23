// Analytics tracking
// This will be implemented when analytics is added to the project

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  // Track event in analytics
  // analytics.track(eventName, properties);
  console.log("Analytics event:", eventName, properties);
}

export function trackPageView(pageName: string) {
  // Track page view
  // analytics.page(pageName);
  console.log("Page view:", pageName);
}
