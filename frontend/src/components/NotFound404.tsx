
function NotFound404 () {
    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
	return (
		<div className="404notFound">
			<h2>ไม่พบหน้าที่คุณค้นหา</h2>
		</div>
	)
}

export default NotFound404