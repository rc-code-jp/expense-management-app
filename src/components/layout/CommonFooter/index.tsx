export function CommonFooter() {
	return (
		<footer className="footer items-center bg-neutral p-4 text-neutral-content">
			<aside className="grid-flow-col items-center">
				<p>Copyright &copy; {new Date().getFullYear()} - All right reserved</p>
			</aside>
		</footer>
	);
}
