"use strict";(self.webpackChunkformula_one=self.webpackChunkformula_one||[]).push([[220],{1220:(C,r,l)=>{l.r(r),l.d(r,{SeasonResultModule:()=>A,singlePageLazyLoad:()=>g});var a=l(6019),d=l(4753),p=l(9149),t=l(3556),i=l(1439),Z=l(529),m=l(916);const h=function(n){return{"driver-id-hightlight":n}};function T(n,u){if(1&n&&(t.TgZ(0,"tr",6),t.TgZ(1,"th"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.qZA(),t.TgZ(13,"td"),t._uU(14),t.qZA(),t.TgZ(15,"td"),t._uU(16),t.qZA(),t.qZA()),2&n){const e=u.$implicit,s=t.oxw(2);t.Q6J("ngClass",t.VKq(9,h,s.driverId===(null==e.Results[0]||null==e.Results[0].Driver?null:e.Results[0].Driver.driverId))),t.xp6(2),t.Oqu(null==e?null:e.round),t.xp6(2),t.Oqu(null==e?null:e.raceName),t.xp6(2),t.Oqu(null==e||null==e.Circuit?null:e.Circuit.circuitName),t.xp6(2),t.Oqu(null==e.Results[0]||null==e.Results[0].Driver?null:e.Results[0].Driver.familyName),t.xp6(2),t.Oqu(null==e.Results[0]||null==e.Results[0].Constructor?null:e.Results[0].Constructor.name),t.xp6(2),t.Oqu(null==e.Results[0]?null:e.Results[0].points),t.xp6(2),t.Oqu(null==e.Results[0]?null:e.Results[0].laps),t.xp6(2),t.Oqu(null==e.Results[0]||null==e.Results[0].Time?null:e.Results[0].Time.time)}}function R(n,u){if(1&n&&(t.TgZ(0,"table",4),t.TgZ(1,"thead"),t.TgZ(2,"tr"),t.TgZ(3,"th"),t._uU(4,"Round"),t.qZA(),t.TgZ(5,"th"),t._uU(6,"Race"),t.qZA(),t.TgZ(7,"th"),t._uU(8,"Circuit"),t.qZA(),t.TgZ(9,"th"),t._uU(10,"Winner"),t.qZA(),t.TgZ(11,"th"),t._uU(12,"Constructor"),t.qZA(),t.TgZ(13,"th"),t._uU(14,"Points"),t.qZA(),t.TgZ(15,"th"),t._uU(16,"Laps"),t.qZA(),t.TgZ(17,"th"),t._uU(18,"Time"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(19,"tbody"),t.YNc(20,T,17,11,"tr",5),t.qZA(),t.qZA()),2&n){const e=t.oxw();t.xp6(20),t.Q6J("ngForOf",e.races)}}function f(n,u){1&n&&(t.TgZ(0,"div",7),t.TgZ(1,"span"),t._uU(2,"No result found"),t.qZA(),t.qZA())}let v=(()=>{class n extends p.g{constructor(e,s){super(),this._route=e,this._ergastProvider=s,this.pageTitle="",this.races=[]}get centerContent(){return this.races.length>0}ngOnInit(){const e=this._route.snapshot.paramMap.get("year"),s=this._route.snapshot.paramMap.get("driverId");if(null==e)return;const c=Number(e);this.driverId=null!=s?String(s):null,this.pageTitle=`Season ${c} Result`,this._apiRequest(this._ergastProvider.getSeasonResults(c)).pipe((0,d.U)(o=>o.MRData.RaceTable.Races)).subscribe({next:o=>this.races=o,error:o=>{console.error(o),this.races=[]}})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(i.gz),t.Y36(Z.E))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-season-result"]],features:[t.qOj],decls:5,vars:5,consts:[[3,"heading","centerContent","isLoading"],[1,"table-responsive"],["id","races-table","class","table",4,"ngIf"],["class","no-list-items-text p-4",4,"ngIf"],["id","races-table",1,"table"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngClass"],[1,"no-list-items-text","p-4"]],template:function(e,s){1&e&&(t.TgZ(0,"app-page",0),t.ynx(1),t.TgZ(2,"div",1),t.YNc(3,R,21,1,"table",2),t.qZA(),t.YNc(4,f,3,0,"div",3),t.BQk(),t.qZA()),2&e&&(t.Q6J("heading",s.pageTitle)("centerContent",s.centerContent)("isLoading",s.isLoading),t.xp6(3),t.Q6J("ngIf",s.races.length>0),t.xp6(1),t.Q6J("ngIf",0===s.races.length))},directives:[m.I,a.O5,a.sg,a.mk],styles:[".driver-id-hightlight[_ngcontent-%COMP%]{background-color:#15151e;color:#fff}"]}),n})();var q=l(1055);const g=i.Bz.forChild([{path:"",component:v}]);let A=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[a.ez,q.B,g]]}),n})()}}]);