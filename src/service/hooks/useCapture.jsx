import { useCallback } from 'react';
import { toPng } from 'html-to-image';

export const useCapture = (ref) => {
  const capture = useCallback(async () => {
    if (ref.current) {
      const dataUrl = await toPng(ref.current);

      // 클립보드에 이미지 복사
      const blob = await fetch(dataUrl).then((res) => res.blob());

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
    }
  }, []);

  return capture;
};
