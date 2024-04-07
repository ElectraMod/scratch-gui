// Volumes in this file are always in 0-1.

let hasSetup = false;
/** @type {AudioParam|null} */
let gainNode = null;
let unmuteVolume = 1;
let volumeBeforeFinishSetup = 1;
let globalVm;
const callbacks = [];

export const setVolume = (newVolume) => {
  if (gainNode) {
    gainNode.value = newVolume;
    // extended audio
    if ("ext_jgExtendedAudio" in globalVm.runtime) {
      const extension = globalVm.runtime.ext_jgExtendedAudio;
      const helper = extension.helper;
      // audio context might not be created, make it for him
      if (!helper.audioContext) helper.audioContext = new AudioContext();
      // gain node for volume slidor might not be created, make it for him
      if (!helper.audioGlobalVolumeNode) {
        helper.audioGlobalVolumeNode = helper.audioContext.createGain();
        helper.audioGlobalVolumeNode.gain.value = gainNode.value;
        helper.audioGlobalVolumeNode.connect(helper.audioContext.destination);
      } else {
        helper.audioGlobalVolumeNode.gain.value = gainNode.value;
      }
    }
    // literally any other extension
    for (const audioData of globalVm.runtime._extensionAudioObjects.values()) {
      if (audioData.gainNode) {
        audioData.gainNode.gain.value = gainNode.value;
      }
    }
  } else {
    volumeBeforeFinishSetup = newVolume;
  }
  callbacks.forEach((i) => i());
};

export const getVolume = () => {
  if (gainNode) {
    return gainNode.value;
  }
  return volumeBeforeFinishSetup;
};

export const isMuted = () => {
  return getVolume() === 0;
};

export const setUnmutedVolume = (newUnmuteVolume) => {
  unmuteVolume = newUnmuteVolume;
};

export const setMuted = (newMuted) => {
  if (newMuted) {
    setUnmutedVolume(getVolume());
    setVolume(0);
  } else {
    setVolume(unmuteVolume);
  }
};

export const onVolumeChanged = (callback) => {
  callbacks.push(callback);
};

const gotAudioEngine = (audioEngine) => {
  if (!audioEngine) {
    console.error('could not get audio engine; sound-related addons will not work');
    return;
  }
  gainNode = audioEngine.inputNode.gain;
  gainNode.value = volumeBeforeFinishSetup;
  // extended audio
  if ("ext_jgExtendedAudio" in globalVm.runtime) {
    const extension = globalVm.runtime.ext_jgExtendedAudio;
    const helper = extension.helper;
    // audio context might not be created, make it for him
    if (!helper.audioContext) helper.audioContext = new AudioContext();
    // gain node for volume slidor might not be created, make it for him
    if (!helper.audioGlobalVolumeNode) {
      helper.audioGlobalVolumeNode = helper.audioContext.createGain();
      helper.audioGlobalVolumeNode.gain.value = gainNode.value;
      helper.audioGlobalVolumeNode.connect(helper.audioContext.destination);
      return;
    }
    helper.audioGlobalVolumeNode.gain.value = gainNode.value;
  }
  // literally any other extension
  for (const audioData of globalVm.runtime._extensionAudioObjects.values()) {
    if (audioData.gainNode) {
      audioData.gainNode.gain.value = gainNode.value;
    }
  }
};

export const setup = (vm) => {
  if (hasSetup) {
    return;
  }
  hasSetup = true;
  globalVm = vm;

  const audioEngine = vm.runtime.audioEngine;
  if (audioEngine) {
    gotAudioEngine(audioEngine);
  } else {
    vm.runtime.once("PROJECT_LOADED", () => {
      gotAudioEngine(vm.runtime.audioEngine);
    });
  }
};
