function myForm() {

    var app = this;
    var inputFullName = $('#userFullName'); // Поле ввода 
    var labelName = $('#formatedData .name span'); // Контейнер вывода имени
    var labelSurname = $('#formatedData .surname span'); // Контейнер вывода фамилии
    var labelPatronymic = $('#formatedData .patronymic span'); // Контейнер вывода отчества
    var errorMesage = $('.error-message'); //  Контейнер выводасообщения об ошибке
    var submitBtn = $('#submitBtn'); // Кнопка отправки данных 
    var myModal = $('#myModal'); // Модальное окно
    var userData = {
        'surname': '',
        'name': '',
        'patronymic': '',
        'fullFields': false
    }; // Данные пользователя

    this.init = function () {
        inputFullName.keyup(function () {
            if (app.invalidTest(this.value)) {
                app.setData(this.value);
            }
        });

        submitBtn.click(function () {
            if (app.emptyTest(userData.fullFields)) {
                app.showModal();
            }
        });

    }
    
    // Проверка на заполненность всех полей
    this.emptyTest = function (valid) {
        if (!valid) {
            inputFullName.addClass('error');
            errorMesage.html('Вы ввели имя не полностью');
            return false;
        }
        return true;

    }
    
    // Проверка на корректность символов
    this.invalidTest = function (checkingString) {
        var result = (/[^А-Яа-яA-Za-z\s]/).test(checkingString);
        if (result) {
            inputFullName.addClass('error');
            errorMesage.html('Вы ввели недопустимый символ');
            return false;
        } else {
            errorMesage.html('');
            inputFullName.removeClass('error');
        }
        return true;
    }
    
    // установка значений полей
    this.setData = function (fullName) {
        arrName = fullName.replace(/^\s+|\s+$/g, '').split(/\s+/g);

        userData.fullFields = app.setFullFields(arrName.length);
        userData.surname = app.formatedField(arrName[0]);
        userData.name = app.formatedField(arrName[1]);
        userData.patronymic = app.formatedField(arrName[2]);
        
        app.updateTpl(userData);
    }
    
    // Форматирование значения поля
    this.formatedField = function(value){
        if(typeof value != 'undefined' && value != ''){
            return value.charAt(0).toUpperCase() + value.substr(1);
        } else {
            return '';
        }
    }
    
    // Установка статуса заполненности
    this.setFullFields = function (countFields) {
        if (countFields < 3) {
            return false;
        } else {
            errorMesage.html('');
            inputFullName.removeClass('error');
            return true;
        }
    }
    
    // Вывод текущих отформатированных данных
    this.updateTpl = function (userData) {
        labelName.html(userData.name);
        labelSurname.html(userData.surname);
        labelPatronymic.html(userData.patronymic);
    }
    
    // Открытие модального окна
    this.showModal = function () {
        myModal.find('.user-name').html(userData.surname + ' ' + userData.name + ' ' + userData.patronymic);
        myModal.modal('show');
    }


}
