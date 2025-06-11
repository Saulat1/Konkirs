document.addEventListener('DOMContentLoaded', function() {
    // 1. Konkurs tugashiga qolgan vaqt hisoblagichi
    function updateCountdown() {
        // Konkurs tugashi - 2025 yil 27 iyul
        const endDate = new Date(2025, 6, 27);
        const now = new Date().getTime();
        const distance = endDate - now;
        
        // Kun, soat, minut, soniyalarni hisoblash
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Displeyda ko'rsatish
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = Math.floor(hours).toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Agar konkurs tugagan bo'lsa
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown-container').innerHTML = '<h4>Konkurs yakunlandi!</h4>';
        }
    }
    
    // Har soniyada yangilash
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);

    // 2. Ariza formasi
    const contestForm = document.getElementById('contestForm');
    if (contestForm) {
        contestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Qoidalarga rozilik tekshiruvi
            if (!document.getElementById('agreeRules').checked) {
                alert('Iltimos, konkurs qoidalariga roziligingizni bildiring');
                return;
            }
            
            // Forma ma'lumotlarini yig'ish
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                telegram: document.getElementById('telegram').value,
                instagram: document.getElementById('instagram').value,
                subscribeNews: document.getElementById('subscribeNews').checked,
                timestamp: new Date().toISOString()
            };
            
            // LocalStorage-ga saqlash (real loyihada serverga yuboriladi)
            let participants = JSON.parse(localStorage.getItem('contestParticipants')) || [];
            participants.push(formData);
            localStorage.setItem('contestParticipants', JSON.stringify(participants));
            
            // Tugmani "yuborilmoqda" holatiga o'tkazish
            const submitBtn = contestForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Yuborilmoqda...';
            
            // Serverga yuborishni simulatsiya qilish (1.5 soniya)
            setTimeout(() => {
                // Muvaffaqiyatli yuborildi
                submitBtn.textContent = '✓ Ariza qabul qilindi!';
                
                // Muvaffaqiyat xabari
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success mt-3 animate__animated animate__fadeIn';
                alertDiv.innerHTML = `
                    <h4 class="alert-heading">Arizangiz uchun rahmat!</h4>
                    <p>Sizning arizangiz №${participants.length} qabul qilindi. Ijtimoiy tarmoqlardagi obunalaringizni tekshiring:</p>
                    <div class="social-links text-center">
                        <a href="https://t.me/dako9640" class="btn btn-telegram btn-sm" target="_blank">
                            <i class="fab fa-telegram"></i> Telegramda obunani tekshirish
                        </a>
                        <a href="https://www.instagram.com/dako9640?igsh=MWx2cmExYm9neWdw" class="btn btn-instagram btn-sm" target="_blank">
                            <i class="fab fa-instagram"></i> Instagramda obunani tekshirish
                        </a>
                    </div>
                `;
                
                // Xabarni forma ostiga qo'shish
                contestForm.parentNode.insertBefore(alertDiv, contestForm.nextSibling);
                
                // Xabarga scroll qilish
                alertDiv.scrollIntoView({ behavior: 'smooth' });
                
                // Formani tozalash (yangiliklar obunasini saqlab qolish)
                contestForm.reset();
                document.getElementById('subscribeNews').checked = true;
                
                // Tugmani asl holatiga qaytarish (3 soniyadan keyin)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
                
            }, 1500);
        });
    }
    
    // 3. Ijtimoiy tarmoqlarga obunani tekshirish (simulyatsiya)
    function checkSocialSubscription() {
        console.log('Obunalar tekshirilmoqda...');
    }
    
    // 4. Scroll paytida animatsiyalar
    function setupScrollAnimations() {
        const animateOnScroll = () => {
            document.querySelectorAll('.step, .prize-section, .participation-form').forEach(el => {
                const elTop = el.getBoundingClientRect().top;
                if (elTop < window.innerHeight * 0.75) {
                    el.classList.add('animate__animated', 'animate__fadeInUp');
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
    }
    
    // 5. Yuqoriga qaytish tugmasi
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'btn btn-primary btn-scroll-top';
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    
    // Dasturni ishga tushirish
    checkSocialSubscription();
    setupScrollAnimations();
});