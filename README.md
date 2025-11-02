# MiniCRM v2 (PWA) — GitHub Pages

Готовый набор файлов для публикации на GitHub Pages (репозиторий-сайт).

## Структура
```
mini-crm-v2/
├─ index.html
├─ styles.css
├─ app.min.js
├─ manifest.webmanifest
├─ service-worker.js
└─ icons/
   ├─ icon-192.png
   └─ icon-512.png
```

## Развёртывание
1. Создайте публичный репозиторий **mini-crm-v2**.
2. Скопируйте все файлы из этой папки в корень репозитория.
3. Включите **Settings → Pages → Deploy from a branch → main / (root)**.
4. Откройте `https://<user>.github.io/mini-crm-v2/`

## Проверка PWA
- Меню браузера → Add to Home Screen.
- В DevTools → Application → Service Workers/Manifest — всё зелёное.
- В офлайне открывается (кэш оболочки).

## Настройки лицензий
- В `app.min.js` замените `PAY.redeem` на ваш Apps Script URL.
- Публичный ключ `publicKeyPem` — вставьте ваш (ECDSA P-256).
