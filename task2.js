import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

// Функция для вычисления SHA3-256 хеша
function getSHA3_256(data) {
    return createHash('sha3-256').update(data).digest('hex');
}

function main() {
    const dir = join(__dirname, 'task2'); // Путь к папке с файлами
    const email = 'givi.khaduri@gmail.com'.toLowerCase(); // Ваш e-mail в нижнем регистре
    const expectedFileCount = 256; // Ожидаемое количество файлов
    let hashes = [];

    try {
        // Получаем список всех файлов
        const files = readdirSync(dir);

        // Фильтруем только .data файлы
        const dataFiles = files.filter(file => file.endsWith('.data'));

        // Проверяем количество файлов
        if (dataFiles.length !== expectedFileCount) {
            console.error(`Error: Expected ${expectedFileCount} files, found ${dataFiles.length}`);
            return;
        }

        // Вычисляем SHA3-256 хеш для каждого файла
        dataFiles.forEach(file => {
            const filePath = join(dir, file);
            const fileData = readFileSync(filePath); // Чтение файла как двоичных данных
            const hash = getSHA3_256(fileData);
            hashes.push(hash);
        });

        // Сортируем хеши и объединяем их в строку без разделителя
        hashes.sort();
        const combinedHashes = hashes.join(''); // Объединяем хеши без разделителя

        // Создаем финальную строку с добавленным e-mail и вычисляем её SHA3-256 хеш
        const finalString = combinedHashes + email;
        const finalHash = getSHA3_256(finalString);

        // Вывод результата
        console.log(`${finalHash}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
