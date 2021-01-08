<template>
  <div id="app" class="navbar-top" :class="{'sidebar-xs': sidebarCollapsed}">

		<app-network-status></app-network-status>

		<!-- Main navbar -->
		<div id="navbar" class="navbar navbar-expand-md navbar-dark fixed-top">

			<!-- Header with logos -->
			<div id="navbar-header" class="navbar-header navbar-dark d-none d-md-flex align-items-md-center">
				<div id="logo-md" class="navbar-brand navbar-brand-md py-0">
					<router-link to="/home" class="d-flex align-items-center">
						<img src="/img/logo_governo.png" alt="..." style="height: 2.5rem;">
            <span>
              <span class="word-first">Polícia Civil&nbsp;<span class="word-last">do Estado de São Paulo&nbsp;</span></span>
              <br>
              <span class="word">Sistema Analítico de Investigação</span>
            </span>
					</router-link>
				</div>

				<div id="logo-xs" class="navbar-brand navbar-brand-xs py-0">
					<router-link to="/home" class="d-inline-block">
						<img src="/img/logo_governo.png" alt="..." style="height: 2.5rem;">
					</router-link>
				</div>
			</div>
			<!-- /header with logos -->

			<!-- Mobile controls -->
			<div id="mobile-controls" class="d-flex flex-1 d-md-none">
				<div id="logo" class="navbar-brand mr-auto">
					<router-link to="/home" class="d-inline-block">
						<img src="/img/logo_dark.png" alt="...">
					</router-link>
				</div>

				<button id="toggle-tree" type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-mobile">
					<i class="icon-tree5"></i>
				</button>

				<button id="toggle-menu" type="button" @click="onToggleSidebar($event)" class="navbar-toggler sidebar-mobile-main-toggle">
					<i class="icon-paragraph-justify3"></i>
				</button>

				<button id="toggle-unfold" type="button" class="navbar-toggler sidebar-mobile-component-toggle">
					<i class="icon-unfold"></i>
				</button>
			</div>
			<!-- /mobile controls -->

			<!-- Navbar content -->
			<div id="navbar-mobile" class="collapse navbar-collapse">
				<ul class="navbar-nav mr-md-auto">
					<li class="nav-item">
						<a id="toggle-sidebar" @click="onToggleSidebar($event)" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
							<i class="icon-paragraph-justify3"></i>
						</a>
					</li>
				</ul>

				<ul class="navbar-nav">
					<!--li class="nav-item dropdown">
						<a href="#" class="navbar-nav-link dropdown-toggle caret-0" data-toggle="dropdown">
							<i class="icon-bell2"></i>
							<span class="d-md-none ml-2">Notificações</span>
							<span class="badge badge-mark border-pink-400 ml-auto ml-md-0"></span>
						</a>

						<div class="dropdown-menu dropdown-menu-right dropdown-content wmin-md-350">
							<div class="dropdown-content-header">
								<span class="font-weight-semibold">Notificações</span>
								<a href="#" class="text-default"><i class="icon-compose"></i></a>
							</div>

							<div class="dropdown-content-body dropdown-scrollable">
								<ul class="media-list">
									<li class="media">
										<div class="mr-3 position-relative">
											<img src="http://demo.interface.club/limitless/demo/bs4/Template/global_assets/images/demo/users/face10.jpg" class="rounded-circle" alt="" width="36" height="36">
										</div>

										<div class="media-body">
											<div class="media-title">
												<a href="#">
													<span class="font-weight-semibold">James Alexander</span>
													<span class="text-muted float-right font-size-sm">04:58</span>
												</a>
											</div>

											<span class="text-muted">who knows, maybe that would be the best thing for me...</span>
										</div>
									</li>
								</ul>
							</div>

							<div class="dropdown-content-footer justify-content-center p-0">
								<router-link to="/notifications" class="bg-light text-grey w-100 py-2" title="Ver mais">
									<i class="icon-menu7 d-block top-0"></i>
								</router-link>
							</div>
						</div>
					</li-->

					<li :class="[{ 'dropdown-user': sidebarCollapsed }, 'nav-item']">
						<b-dropdown v-if="sidebarCollapsed" id="dropdown-user" variant="link" toggle-class="navbar-nav-link border-0">
							<template slot="button-content">
								<app-avatar :data="profile.picture" :empty-data="profile.firstName | firstLetter" alt="Foto"></app-avatar>
								<span>{{ profile.firstName }}</span>
							</template>
							<b-dropdown-item id="my-profile" to="/account"><i class="icon-user-plus"></i> Meu cadastro</b-dropdown-item>
							<b-dropdown-item id="change-password" to="/account"><i class="icon-key"></i> Alterar senha</b-dropdown-item>
							<b-dropdown-divider></b-dropdown-divider>
							<b-dropdown-item id="logout" @click="onSignOut($event)" class="text-danger"><i class="icon-switch2"></i> Sair</b-dropdown-item>
						</b-dropdown>
						<a v-else id="logout" @click="onSignOut($event)" class="navbar-nav-link"><i class="icon-switch2"></i> Sair</a>
					</li>
				</ul>
			</div>
			<!-- /navbar content -->

		</div>
		<!-- /main navbar -->
					
		<!-- Page content -->
		<div class="page-content">

			<!-- Main sidebar -->
			<div class="sidebar sidebar-dark sidebar-main sidebar-expand-md">

				<!-- Sidebar mobile toggler -->
				<div class="sidebar-mobile-toggler text-center">
					<a href="#" class="sidebar-mobile-main-toggle">
						<i class="icon-arrow-left8"></i>
					</a>
					Navegação
					<a href="#" class="sidebar-mobile-expand">
						<i class="icon-screen-full"></i>
						<i class="icon-screen-normal"></i>
					</a>
				</div>
				<!-- /sidebar mobile toggler -->

				<!-- Sidebar content -->
				<div class="sidebar-content">

					<!-- User menu -->
					<div class="sidebar-user">
						<div class="card-body">
							<div class="media">
								<div class="mr-3">
									<router-link to="/">
                    <app-avatar :data="profile.picture" :empty-data="profile.firstName | firstLetter" alt="Foto"></app-avatar>
									</router-link>
								</div>

								<div class="media-body">
									<div class="media-title font-weight-semibold">{{ profile.firstName }}</div>
									<div class="font-size-xs opacity-50">
										{{ profile.occupation | startCase }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- /user menu -->

					<!-- Main navigation -->
					<div class="card card-sidebar-mobile">
						<ul class="nav nav-sidebar" data-nav-type="accordion">

							<template v-for="route in routes">
								<!-- Header -->
								<li v-if="'header' === route.meta.type" :key="route.name" class="nav-item-header">
									<div class="text-uppercase font-size-xs line-height-xs">{{ route.meta.title }}</div>
									<i :class="route.meta.icon" :title="route.meta.title"></i>
								</li>

								<!-- Menu item -->
								<li v-if="!route.meta.hidden && !route.children && !route.meta.type" :key="route.name" class="nav-item">
									<router-link :to="route.path" :exact="true" active-class="active" class="nav-link">
										<i :class="route.meta.icon"></i>
										<span>{{ route.meta.title }}</span>
										<span v-if="route.meta.badge" class="badge bg-blue-400 align-self-center ml-auto">{{ route.meta.badge }}</span>
									</router-link>
								</li>

								<!-- Submenu -->
								<li v-if="!route.meta.hidden && route.children && route.children.length > 0" :key="route.name" class="nav-item nav-item-submenu" :class="{'nav-item-open': submenus[route.name]}">
									<a @click="submenus = toggleSubmenu(route)" class="nav-link"><i :class="route.meta.icon"></i> <span>{{ route.meta.title }}</span></a>

									<ul class="nav nav-group-sub" :data-submenu-title="route.meta.title" :class="{'d-block': submenus[route.name]}">
										<template v-for="child in route.children">
											<li v-if="!child.meta.hidden" :key="child.name" class="nav-item">
												<router-link :to="{ name: child.name }" active-class="active" class="nav-link">{{ child.meta.title }}</router-link>
											</li>
										</template>
									</ul>
								</li>
							</template>

						</ul>
					</div>
					<!-- /main navigation -->

				</div>
				<!-- /sidebar content -->
				
			</div>
			<!-- /main sidebar -->

			<!-- Main content -->
			<div class="content-wrapper">

				<!-- Content area -->
				<div class="content pt-0">
						<transition name="fade" mode="out-in">
							<!--keep-alive>
								<router-view></router-view>
							</keep-alive-->
							<router-view></router-view>
						</transition>
				</div>
				<!-- /content area -->

				<!-- Footer -->
				<div class="navbar navbar-expand-lg navbar-light">
					<div class="text-center d-lg-none w-100">
						<button type="button" class="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-footer">
							<i class="icon-unfold mr-2"></i>
							Rodapé
						</button>
					</div>

					<div class="navbar-collapse collapse" id="navbar-footer">
						<span class="navbar-text">
							&copy; 2018. Sistema de Inquérito Policial Eletrônico Analítico
						</span>

						<!--
						TODO Comentado temporariamente até a criação da funcionalidade de status do sistema.
						-->
						<!--ul class="navbar-nav ml-lg-auto">
							<li class="nav-item">
								<a href="https://www.statuspage.io/" target="_blank" class="navbar-nav-link font-weight-semibold">
									<span>Status<i class="icon-checkmark-circle ml-1"></i></span>
								</a>
							</li>
						</ul-->
					</div>
				</div>
				<!-- /footer -->

			</div>
			<!-- /main content -->

		</div>
		<!-- /page content -->

  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  @Prop() private msg!: string;
  private submenus: any = {};
  private routes: any[] = [];

  protected created() {
    const router: any = this.$router;
    this.routes = router.options.routes;
  }

  @Watch('$route')
  private onRouteChanged(route: any, oldRoute: any) {
    if (route.matched && route.matched.length === 1) { // Não possui submenus
      this.submenus = [];
    } else if (route.matched && route.matched.length > 1) {
      this.submenus[route.matched[0].name] = true;
    }
  }

  private onToggleSidebar(): void {
    this.$store.dispatch('layout/toggleSidebar');
  }

  private onSignOut(event: Event): void {
    this.$confirm('Você realmente gostaria de sair da aplicação?', 'Atenção', {
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      type: 'warning',
    })
    .then(() => this.$store.dispatch('auth/logout'))
    .catch((action: string) => { /* console.debug(action) */ });
  }

  private toggleSubmenu(route: any): any {
    this.submenus[route.name] = !this.submenus[route.name];
    return Object.assign({}, this.submenus);
  }

  private get sidebarCollapsed(): boolean {
    return this.$store.getters['layout/sidebarCollapsed'];
  }

  private get profile(): any {
    return this.$store.getters['auth/profile'];
  }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900");
@import "./assets/icons/icomoon/styles.css";
@import "./styles/layouts/layout_2/default/compile/bootstrap";
@import "./styles/layouts/layout_2/default/compile/bootstrap_limitless";
@import "./styles/layouts/layout_2/default/compile/layout";
@import "./styles/layouts/layout_2/default/compile/components";
@import "./styles/offline-theme";

#app {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.word-first {
  color: #B71C1C;
  font-weight: 600;
  font-size: 12px;
  margin-top: -3px;
}
.word-last {
  color: white;
  font-weight: 600;
  font-size: 12px;
  margin-top: -3px;
}
.word {
  color: white;
  font-size: 13px;
  margin-top: -3px;
}
.el-form-item--medium .el-form-item__label {
  line-height: 19px !important;
}
.el-form--label-top .el-form-item__label {
  padding: 0 !important;
}
.el-form-item__label {
  margin-bottom: 0 !important;
	font-weight: 600;

  div {
    display: inline-block !important;
  }

  i {
    margin-left: 0.2rem !important;
    font-size: 14px;
  }
}
.el-button--medium {
  i {
    font-size: 12px;
  }
}
.el-dropdown-link:hover {
	color: #409EFF;
	cursor: pointer;
}
.el-loading-spinner svg {
	display: block;
  margin: auto;
}
.btn {
	border: 1px solid;
}
.actions-column {
	width: 80px;
	text-align: center !important;
}
.confidencial-column {
	width: 150px;
}
.number-column {
	width: 50px;
	text-align: center !important;
}

/**
 * Form Item
 * 
 * Sobrescrita necessária para aplicar a classe CSS somente quando o 
 * campo está preenchido.
 */
.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-textarea__inner {
	border-color: #dcdfe6 !important;
}
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner:focus {
	border-color: #409EFF !important;
}
.el-input.is-success .el-input__inner,
.el-input.is-success .el-textarea__inner,
.el-select.is-success .el-input__inner {
	border-color: #67c23a !important;
}
.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus {
	border-color: #f56c6c !important;
}

/**
 * Notification
 *
 * Sobrescrita necessária para alterar o designer da caixa de notificação, 
 * pois a mesma não possui atributo do tipo class na div parent do ícone 
 * de alerta.
 */
.el-notification {
	border-radius: initial !important;
}
.el-notification-warning.right {
	border-left: 6px solid $color-warning-400;
}
.el-notification-success.right {
	border-left: 6px solid $color-success-700;
}
.el-notification-info.right {
	border-left: 6px solid $color-info-600;
}
.el-notification-error.right {
	border-left: 6px solid $color-danger-600;
}
.el-notification .el-icon-warning {
	color: $color-warning-400 !important;
}
.el-notification .el-icon-success {
	color: $color-success-700 !important;
}
.el-notification .el-icon-info {
	color: $color-info-600 !important;
}
.el-notification .el-icon-error {
	color: $color-danger-600 !important;
}

/**
 * Tab Pane
 *
 * Sobrescrita para aplicar o mesmo estilo CSS no badge utilizado como 
 * parte do nome do tab.
 */
.el-tabs__item {
	.badge {
		background-color: #555 !important;
		color: white;
	}	
}
.el-tabs__item:hover,
.el-tabs__item.is-active {
	.badge {
		background-color: #409EFF !important;
		color: white;
		cursor: pointer;
	}
}
.el-tabs__item.is-disabled {
	.badge {
		background-color: #c0c4cc !important;
		color: white;
	}
}

/**
 * Popover
 *
 * Sobrescrita para melhorar o realce do popover exibido sobre os 
 * componentes em tela.
 */
.el-popper[x-placement^=top] .popper__arrow {
  border-top-color: rgba(0, 0, 0, 0.2) !important;
}
.el-popover {
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}

/**
 * Swiper (Vue Awesome Swiper)
 *
 * Sobrescrita para não deixar a paginação sobre as fotos dos suspeitos.
 */
.swiper-pagination {
	position: inherit !important;
}
.swiper-button-prev,
.swiper-button-next {
	bottom: 0 !important;
	margin-top: auto !important;
	padding-top: 10px !important;
	background-image: none !important;
	color: #007aff !important;
}

/**
 * 
 * table-collpase.vue - componente
 *
 * b-pagination
 *
 * Alinhando texto com a paginação
 */
.b-pagination-line {
  line-height: 34px;
}

/**
 * 
 * historico-modal.vue - componente
 *
 * Justificando textos
 */
.input-text-align-justify {
  text-align: justify;
}
</style>
