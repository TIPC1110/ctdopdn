// Scroll animation
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.reveal');

    for(let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if(revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json' // Yêu cầu Formspree trả về JSON
            }
        });

        if (response.ok) {
            alert('Tin nhắn của bạn đã được gửi thành công!');
            form.reset(); // Xóa form sau khi gửi thành công
        } else {
            // Xử lý lỗi từ Formspree
            const errorData = await response.json();
            alert('Đã có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
            console.error('Lỗi khi gửi form:', errorData);
        }
    } catch (error) {
        alert('Đã có lỗi xảy ra khi gửi tin nhắn. Vui lòng kiểm tra kết nối mạng của bạn.');
        console.error('Lỗi mạng:', error);
    }
});