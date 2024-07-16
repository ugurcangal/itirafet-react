export const getCurrentDateTime = () => {
    const now = new Date(); // Şu anki tarih ve saat bilgisini al

    // Tarih ve saat bilgisini istediğimiz formatta stringe dönüştür
    const day = now.getDate().toString().padStart(2, '0'); // Gün (iki haneli olarak)
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Ay (1-12 arası, iki haneli olarak)
    const year = now.getFullYear(); // Yıl
    const hours = now.getHours().toString().padStart(2, '0'); // Saat (24 saat formatında, iki haneli olarak)
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Dakika (iki haneli olarak)

    // İstediğiniz formatta tarih ve saat stringini oluştur
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDateTime;
};