
export enum View {
  Survey,
  AdminLogin,
  Dashboard,
}

export interface SurveyResponse {
  name: string;
  overallCleanliness: number;
  restroomCleanliness: number;
  commonAreaCleanliness: number;
  improvements: string;
  timestamp: Date;
}