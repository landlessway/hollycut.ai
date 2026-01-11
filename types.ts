export enum AspectRatio {
  TIKTOK = '9:16',
  XIAOHONGSHU = '3:4',
  BILIBILI = '4:3',
  YOUTUBE = '16:9'
}

export interface GenerationState {
  isGenerating: boolean;
  isEditing: boolean;
  resultImage: string | null;
  error: string | null;
}

export const ASPECT_RATIO_LABELS: Record<AspectRatio, string> = {
  [AspectRatio.TIKTOK]: '抖音 (9:16)',
  [AspectRatio.XIAOHONGSHU]: '小红书 (3:4)',
  [AspectRatio.BILIBILI]: 'B站 (4:3)',
  [AspectRatio.YOUTUBE]: '宽银幕 (16:9)',
};