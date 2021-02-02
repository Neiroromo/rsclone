export default function createUserPage() {
  const userName = localStorage.getItem('userName');

  const html = `<div class="container py-5 user-profile-container">
    <div class="row align-items-center">
        <div class=" col-sm-5 col-md-3 user-name"><h2>
            ${userName}
        </h2></div>
        <div class=" col-sm-1 col-md-1 settings__btn-container">    
            <div class="btn-group">
            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="material-icons">
                    settings
                </span>
            </button>
            <div class=" dropdown-menu dropdown-menu-right settings__list">
            <button class="dropdown-item drop-email-btn" type="button" data-toggle="modal" data-target="#exampleModalCenter">
                    изменить email
                </button>
                <button class="dropdown-item drop-login-btn" type="button" data-toggle="modal" data-target="#exampleModalCenter">
                    изменить имя пользователя
                </button>
                
                <button class="dropdown-item drop-delete-user-btn" type="button" data-toggle="modal" data-target="#deleteUser">
                    удалить профиль
                </button>
            </div>
        </div>
        </div>
        <div class="col-sm-2 col-md-4"></div>
        <div class=" col-sm-2 col-md-2 main-create-btn-container">
            <button class="btn btn-success main-create-btn">
                <span>
                    новая статья
                </span>
            </button>
        </div>
        <div class=" col-sm-2 col-md-2 main-delete-btn-container">
            <button class="btn btn-danger main-delete-btn" data-toggle="modal" data-target="#deleteArticle" disabled>
                <span>
                    удалить
                </span>
            </button>
        </div>
    </div>
    <div class="row align-items-center">
        <ul class="list-group py-5 container articles-container">
            
        </ul>
    </div>
    
    <!-- Modal change user settings -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="settingsTitle">
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="exampleInputPassword1" id='settingsBody'>
                    </label>
                    <input type="text" class="form-control change-value" id="exampleInputPassword1" placeholder="введите новое значение">
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary dismiss-changes-btn" data-dismiss="modal" >
                закрыть
            </button>
            <button type="button" class="btn btn-primary save-user-settings-btn" >
                сохранить
            </button>
            </div>
        </div>
        </div>
    </div>

    <!-- Modal delete user-->
    <div class="modal fade" id="deleteUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
                Удаление страницы пользователя
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                Данное действие удалит пользователя и все созданные им статьи.
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                отмена
            </button>
            <button type="button" class="btn btn-primary delete-user-btn">
                удалить
            </button>
            </div>
        </div>
        </div>
    </div>

    <!-- Modal delete article-->
    <div class="modal fade" id="deleteArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
                Удаление статей
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                Удалить выбранные статьи?
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary dismiss-delete-btn" data-dismiss="modal">
                отмена
            </button>
            <button type="button" id="article-delete-btn" class="btn btn-primary delete-articles-from-server-btn" >
                удалить
            </button>
            </div>
        </div>
        </div>
    </div>
</div>`;

  return html;
}
