export const UserTitle = ({ user = 'My' }: { user?: string }) => (
    <h1 className='text'>{`${user} Pictures`}</h1>
);
