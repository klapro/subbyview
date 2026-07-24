import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { tick } from '../store/slices/playbackSlice';

const TICK_INTERVAL_MS = 200;

/**
 * There is no media file driving the clock (this app is a standalone
 * caption reader), so playback is a plain stopwatch: while `isPlaying`,
 * currentTimeMs is advanced by wall-clock time. The ref mirrors Redux state
 * so seeks/resyncs made mid-playback are picked up without restarting the
 * interval.
 */
export function usePlaybackClock() {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(state => state.playback.isPlaying);
  const currentTimeMs = useAppSelector(state => state.playback.currentTimeMs);
  const currentTimeRef = useRef(currentTimeMs);

  useEffect(() => {
    currentTimeRef.current = currentTimeMs;
  }, [currentTimeMs]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      currentTimeRef.current += TICK_INTERVAL_MS;
      dispatch(tick(currentTimeRef.current));
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPlaying, dispatch]);
}
