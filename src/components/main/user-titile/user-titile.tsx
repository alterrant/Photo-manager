export default function h1({ user = 'My' }: { user?: string }) {
    return <h1 className='text'>{`${user} Pictures`}</h1>;
}
