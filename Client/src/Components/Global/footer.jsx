
import './Footer.css'

function Footer(){
	return (
		<footer className="app-footer">
			<div className="footer-inner">
				<div className="brand">
					<h3>PlayStoreX</h3>
					<p>Juegos y accesorios para Play, PC y consolas.</p>
				</div>

				<div className="socials">
					<a href="#" aria-label="WhatsApp" title="WhatsApp" className="social-link">
						<img src="./assets/whatsapp.jpg" alt="WhatsApp" className="social-icon" />
					</a>

					<a href="#" id="link-ig" aria-label="Instagram" title="Instagram" className="social-link">
						<img src="./assets/instagram.jpg" alt="Instagram" className="social-icon" />
					</a>

					<a href="#" aria-label="Facebook" title="Facebook" className="social-link">
						<img src="./assets/facebook.jpg" alt="Facebook" className="social-icon" />
					</a>
				</div>
			</div>
			<div className="footer-bottom">© {new Date().getFullYear()} PlayStoreX</div>
		</footer>
	)
}

export default Footer
