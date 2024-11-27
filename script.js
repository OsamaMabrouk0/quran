// تحميل بيانات السور من ملف JSON
fetch('./quran.json')
    .then((response) => response.json())
    .then((data) => {
        const surahsContainer = document.getElementById('surahs-container');
        const modal = document.getElementById('modal');
        const modalClose = document.querySelector('.close');
        const surahName = document.getElementById('surah-name');
        const ayahsContainer = document.getElementById('ayahs-container');
        const surahs = data;

        // إنشاء بطاقات لكل سورة
        surahs.forEach((surah) => {
            const surahCard = document.createElement('div');
            surahCard.classList.add('surah-card');
            surahCard.innerHTML = `
                <h3 class="surah-name">${surah.name_ar}</h3>
                <p class="surah-info">عدد الآيات: ${surah.total_verses}</p>
                <p class="surah-info">نوع السورة: ${surah.type === 'meccan' ? 'مكية' : 'مدنية'}</p>
            `;

            // عند النقر على السورة، عرض الآيات في النافذة المنبثقة
            surahCard.addEventListener('click', () => {
                surahName.textContent = surah.name_ar; // تعيين اسم السورة في النافذة
                ayahsContainer.innerHTML = ''; // تفريغ الحاوية
                surah.verses.forEach((verse, index) => {
                    const ayahElement = document.createElement('div');
                    ayahElement.classList.add('ayah');
                    ayahElement.innerHTML = `
                        <span>${index + 1}. </span>${verse.text}
                    `;
                    ayahsContainer.appendChild(ayahElement);
                });

                // عرض النافذة المنبثقة
                modal.style.display = 'block';
            });

            surahsContainer.appendChild(surahCard);
        });

        // إغلاق النافذة المنبثقة
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // إغلاق النافذة عند النقر خارج المحتوى
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    })
    .catch((error) => console.error('Error loading Quran data:', error));
