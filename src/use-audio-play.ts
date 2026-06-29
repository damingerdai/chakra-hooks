/**
 * Hook for playing audio files
 */
const audioCache = new Map<string, HTMLAudioElement>();

export const useAudioPlay = () => {
	const preloadSound = (soundPath: string) => {
		if (audioCache.has(soundPath)) {
			return;
		}
		try {
			const audio = new Audio(soundPath);
			audio.preload = 'auto';
			audio.addEventListener('canplaythrough', () => {
				// Audio is ready to play
			});
			audioCache.set(soundPath, audio);
		} catch (error) {
			console.warn(`Error preloading audio: ${soundPath}`, error);
		}
	};

	const playSound = (soundPath: string) => {
		try {
			let audio = audioCache.get(soundPath);
			if (!audio) {
				audio = new Audio(soundPath);
				audioCache.set(soundPath, audio);
			}
			// Reset audio to the beginning
			audio.currentTime = 0;
			audio.play().catch(error => {
				console.warn(`Failed to play sound: ${soundPath}`, error);
			});
		} catch (error) {
			console.warn(`Error creating audio: ${error}`);
		}
	};

	return { playSound, preloadSound };
};