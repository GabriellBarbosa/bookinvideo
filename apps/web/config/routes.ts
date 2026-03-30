export const ROUTES = {
  course: (courseSlug: string, moduleSlug: string, lessonSlug: string) =>
    `/course/${courseSlug}/${lessonSlug}?module=${moduleSlug}`,
  certificate: (publicId: string) => `/certificate/${publicId}`,
};
