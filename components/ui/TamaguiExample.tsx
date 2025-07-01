import React from 'react';
import { Button, Card, H2, Paragraph, XStack, YStack } from 'tamagui';

export function TamaguiExample() {
  return (
    <YStack space="$4" padding="$4">
      <H2>Welcome to Tamagui!</H2>
      
      <Card elevate size="$4" bordered>
        <Card.Header padded>
          <H2>Card Example</H2>
          <Paragraph theme="alt2">
            This is a Tamagui card component with some example content.
          </Paragraph>
        </Card.Header>
        
        <Card.Footer padded>
          <XStack space="$2">
            <Button theme="active" size="$3">
              Primary
            </Button>
            <Button size="$3" variant="outlined">
              Secondary
            </Button>
          </XStack>
        </Card.Footer>
      </Card>
      
      <YStack space="$2">
        <Button size="$4" theme="blue">
          Blue Button
        </Button>
        <Button size="$4" theme="green">
          Green Button
        </Button>
        <Button size="$4" theme="red">
          Red Button
        </Button>
      </YStack>
    </YStack>
  );
}
