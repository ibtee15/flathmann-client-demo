import Sound from 'react-native-sound';
import gameHorn from '../assets/audio/horn.mp3';
import tenSecsFemale from '../assets/audio/10secF.mp3';
import tenSecsMale from '../assets/audio/10secM.mp3';
import twoMinsFemale from '../assets/audio/2minsFemale.mp3';
import twoMinsMale from '../assets/audio/2minsMale.mp3';
import releaseMale from '../assets/audio/releaseMale.mp3';
import releaseFemale from '../assets/audio/releaseFemale.mp3';

export const playHorn = (hornIsPlaying, sethornIsPlaying) => {
  // console.log('local sound horn ==>>>', gameHorn);
  if (hornIsPlaying) {
    return;
  }
  let Horn = new Sound(gameHorn, err => {
    if (err) {
      console.log('errorrrrrrr in audio', err);
      return;
    }
    sethornIsPlaying(true);
    Horn.play(success => {
      if (success) {
        // console.log('successfully finished playing');
        sethornIsPlaying(false);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};

export const tenSecsF = (tenFemalePlaying, setTenFemaleIsPlaying) => {
  console.log('local sound ==>>> tenSecsFemale', tenSecsFemale);
  if (tenFemalePlaying) {
    return;
  }
  let tenFemale = new Sound(tenSecsFemale, err => {
    if (err) {
      console.log('errorrrrrrr in audio', err);
      return;
    }
    setTenFemaleIsPlaying(true);
    tenFemale.play(success => {
      if (success) {
        console.log('playing');
        setTenFemaleIsPlaying(false);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};

export const tenSecsM = (tenMalePlaying, setTenMaleIsPlaying) => {
  console.log('local sound ==>>> tenSecsMale', tenSecsMale);
  if (tenMalePlaying) {
    return;
  }
  let tenMale = new Sound(tenSecsMale, err => {
    if (err) {
      console.log('errorrrrrrr in audio', err);
      return;
    }
    setTenMaleIsPlaying(true);
    tenMale.play(success => {
      if (success) {
        // console.log('successfully finished playing');
        setTenMaleIsPlaying(false);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};

export const twoMinF = (twoFemalePlaying, setTwoFemaleIsPlaying) => {
  console.log('local sound ==>>> twoMinsFemale', twoMinsFemale);
  if (twoFemalePlaying) {
    return;
  }
  let twoMale = new Sound(twoMinsFemale, err => {
    if (err) {
      console.log('errorrrrrrr in audio', err);
      return;
    }
    setTwoFemaleIsPlaying(true);
    twoMale.play(success => {
      if (success) {
        // console.log('successfully finished playing');
        setTwoFemaleIsPlaying(false);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};

export const twoMinM = (twoMalePlaying, setTwoMaleIsPlaying) => {
  console.log('local sound ==>>> twoMinsMale', twoMinsMale);
  if (twoMalePlaying) {
    return;
  }
  let twoMmale = new Sound(twoMinsMale, err => {
    if (err) {
      console.log('errorrrrrrr in audio', err);
      return;
    }
    setTwoMaleIsPlaying(true);
    twoMmale.play(success => {
      if (success) {
        // console.log('successfully finished playing');
        setTwoMaleIsPlaying(false);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};

export const ReleaseM = (releaseMPlaying, setReleaseMalePlaying) => {
  console.log('local sound ==>>> releaseMale', releaseMale);
  if (releaseMPlaying) {
    return;
  }
  let releaseM = new Sound(releaseMale, err => {
    if (err) {
      console.log('errorrrrrrr in audio', err);
      return;
    }
    setReleaseMalePlaying(true);
    releaseM.play(success => {
      if (success) {
        // console.log('successfully finished playing');
        setReleaseMalePlaying(false);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};

export const ReleaseF = (releaseFPlaying, setReleaseFPlaying) => {
  console.log('local sound ==>>> releaseFemale', releaseFemale);
  if (releaseFPlaying) {
    return;
  }
  let releaseF = new Sound(releaseFemale, err => {
    if (err) {
      console.log('errorrrrrrr in audio', err);
      return;
    }
    setReleaseFPlaying(true);
    releaseF.play(success => {
      if (success) {
        // console.log('successfully finished playing');
        setReleaseFPlaying(false);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};
