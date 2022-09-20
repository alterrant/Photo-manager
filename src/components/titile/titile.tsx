export const Title = ({ user = 'My' }: { user?: string }) => (
  <h1 className="text">{`${user} Pictures`}</h1>
);
