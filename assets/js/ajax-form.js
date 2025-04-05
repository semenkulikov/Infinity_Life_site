/**
 * Обработка AJAX форм на сайте
 * Обеспечивает отправку данных формы без перезагрузки страницы
 */
(function (a) {
	"use strict";

	// Проверяем наличие формы контактов и инициализируем её обработку
	a("#contact-form").length &&
	// Инициализируем валидатор для формы
	(a("#contact-form").validator(),
	// Обработчик отправки формы
	a("#contact-form").on("submit", function (b) {
		// Проверяем, что форма прошла валидацию
		if (!b.isDefaultPrevented())
		return (
			// Отправляем AJAX запрос
			a.ajax({
				type: "POST",
				url: "inc/contact.php",  // URL для обработки формы
				data: a(this).serialize(), // Сериализуем данные формы
				success: function (d) {
					// Обработка успешного ответа
					var f = "alert-" + d.type;  // Тип сообщения (success/error)
					d = d.message;              // Текст сообщения
					// Формируем HTML для отображения сообщения
					var h = '<div class="alert ' + f + ' alert-dismissible" role="alert">' + d + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					// Если есть сообщение и тип, отображаем его и сбрасываем форму
					f && d && (a("#contact-form").find(".messages").html(h), a("#contact-form")[0].reset());
				},
			}),
			!1
		);
	}));

})(jQuery);