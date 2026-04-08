import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailVerificationProps = {
  toName: string;
  verificationCode: string;
};

const EmailVerification = ({
  toName,
  verificationCode,
}: EmailVerificationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>
                Hello {toName}, please verify your email address by using the
                following code:
              </Text>
              <Section>
                <Text className="bg-black rounded text-white p-2 m-2">
                  {verificationCode}
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailVerification.PreviewProps = {
  toName: "Test Name",
  verificationCode: "ARDOQHFN",
} as EmailVerificationProps;

export default EmailVerification;
