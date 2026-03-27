import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailPasswordRestProps = {
  toName: string;
  url: string;
};

const EmailPasswordRest = ({ toName, url }: EmailPasswordRestProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>
                Hello {toName}, you have requested to rest your password. Click
                the button below to rest your password.
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="bg-black rounded text-white p-2 m-2 cursor-pointer"
              >
                Rest Password
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailPasswordRest.PreviewProps = {
  toName: "Test Name",
  url: "http://localhost:3000/password-reset/testToken",
};

export default EmailPasswordRest;
