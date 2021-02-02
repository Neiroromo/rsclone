export default function createArticlePage() {
  const html = `<div class="container-fluid article-page-container">
       <div class="row">
           <div class="col-md-9 container workspace">
               <div class="row workspace__header">
                   <div id="title">
                       <input class="edit-article-title" type="text" value="" placeholder="Введите название статьи" disabled>
                   </div>
                   <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                   <button type="button" class="d-none btn btn-light see-article-inReadMode">
                           <span class="material-icons">
                           visibility
                           </span>
                       </button>
                       <button type="button" class="d-none btn btn-success open-save-modal" data-toggle="modal" data-target="#saveModal">
                           <span class="material-icons">
                               save
                           </span>
                       </button>
                       <button type="button" class="d-none btn btn-danger open-discard-modal" data-toggle="modal" data-target="#discardModal ">
                           <span class="material-icons">
                               clear
                           </span>
                       </button>
                       <button type="button" class="btn btn-secondary switch-to-edit">
                           <span class="material-icons">
                               create
                               </span>
                       </button>
                       
                   </div>
               </div>
               <div class="row workspace__body" id="editorjs">
               </div>
           </div>
           <div class="col-md-3 history">

               <div class="panel panel-default">
                   <div class="panel-heading text-center text-uppercase font-weight-bold">Предыдущие версии</div>
                   <table class="table">
                       <thead>
                       <tr class="thead">
                            <th>Номер</th>
                           <th>Пользователь</th>
                           <th>Дата</th>
                           <th>Изменения</th>
                       </tr>
                       </thead>
                       <tbody class="changed-articles">
                       </tbody>
                   </table>
               </div>



           </div>
       </div>

               <!-- Modal save Article-->
               <div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   <div class="modal-dialog" role="document">
                   <div class="modal-content">
                       <div class="modal-header">
                       <h5 class="modal-title" id="exampleModalLabel">
                           Сохранение
                       </h5>
                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                       </button>
                       </div>
                       <div class="modal-body">
                           
                           <div class="form-group">
                               <label for="article-desc">Добавьте краткое описание:</label>
                               <textarea class="form-control" id="article-desc" rows="6" maxlength="225"></textarea>
                             </div>
                       </div>
                       <div class="modal-footer">
                       <button type="button" class="btn btn-secondary" data-dismiss="modal">
                           отмена
                       </button>
                       <button type="button" class="btn btn-primary save-article-to-server" data-dismiss="modal">
                           сохранить
                       </button>
                       </div>
                   </div>
                   </div>
               </div>

                       <!-- Modal discard changes-->
       <div class="modal fade" id="discardModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
           <div class="modal-dialog" role="document">
           <div class="modal-content">
               <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">
                   Отменить изменения
               </h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
               </button>
               </div>
               <div class="modal-body">
                   Данное действие сбросит изменения.
               </div>
               <div class="modal-footer">
               <button type="button" class="btn btn-secondary " data-dismiss="modal">
                   оставить
               </button>
               <button type="button" class="btn btn-primary discard-article" data-dismiss="modal">
                   сбросить
               </button>
               </div>
           </div>
           </div>
       </div>

   </div>`;
  return html;
}
