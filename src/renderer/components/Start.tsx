import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button, Grid, GridItem } from '@chakra-ui/react';
import { useAudioRecorder } from 'renderer/hooks/useAudioRecorder';

export default function Start() {
    const [isHovered, setIsHovered] = useState(false);
    const { isRecording, startRecording, stopRecording, playRecording } = useAudioRecorder();
  
    const springConfig = { mass: 1, tension: 1000, friction: 20 };
    const springAnimation = useSpring({
      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      config: springConfig,
    });
  
    const handleButtonClick = () => {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    };
  
    return(
      <div>
        <Grid templateColumns="repeat(1, 1fr)" gap={6} justifyContent="center" alignItems={"center"} alignContent="center">
          <GridItem>
            <animated.div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={springAnimation}
            >
              <Button onClick={handleButtonClick}>
                {isRecording ? "🔴 Stop Recording" : "🎙️ Start Recording"}
              </Button>
            </animated.div>
          </GridItem>

          <GridItem>
            <Button onClick={playRecording}>
              Playback Recorded Audio
            </Button>
          </GridItem>
        </Grid>
      </div>
    )
}