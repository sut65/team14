
function AccessDenied () {
    setTimeout(() => {
        window.location.href = "/home";
    }, 2000);
	return (
		<div className="AccessDenied">
			<h2>ปฏิเสธการเข้าถึง: ระดับRoleของคุณไม่สามารถเข้าถึงได้</h2>
		</div>
	)
}

export default AccessDenied