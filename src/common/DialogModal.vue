<template>
	<transition name="modal">
		<div v-if="showModal" @close="showModal = false">
			
				<div class="modal-mask" >
				  <div class="modal-wrapper">
				    <div class="modal-container">

				      <div class="modal-header">
				        <h3 v-html="modalTitle"></h3>
				      </div>

				      <div class="modal-body" v-html="modalContent">
				        
				      </div>

				      <div class="modal-footer">
							<md-button class="md-raised md-primary" style='min-width:30px;width:100%;margin:0;' @click="dialogDoAction()">
								{{modalDoButton}}
							</md-button>
							<md-button class="md-raised md-accent" style='color:#888;min-width:30px;width:100%;margin:0;' v-touch="dialogClose()" v-if="modalCancleView">
								{{modalCancleButton}}
							</md-button>
						</div>

				    </div>
				  </div>
				</div>
			
		</div>	
	</transition>
	
</template>


<script>
export default {
  name: 'DialogModal',
  created() {
	  this.$eventBus.$on('dialogOpen', this.modalOpen);
 
  },
  data() {
	  return {
		showModal:false,
	    modalTitle:'알림',
		modalContent:'메세지',
		modalCancleButton:'취소',
		modalDoButton:'확인',
		modalCancleView:false,
		modalCancleAction:false,
		modalDoAction:false,
		modalEl:false,
		
  	  }
  },
  methods: {
	modalOpen(params) {
		
		if(params.title)this.modalTitle = params.title;
		else this.modalTitle = '알림';
		if(params.content)this.modalContent = params.content;
		
		if(params.doButton)this.modalDoButton = params.doButton;
		else this.modalDoButton = '확인';

		if(params.doAction) this.modalDoAction = params.doAction;
		else  this.modalDoAction = false;
		
		if(params.confirm) {
			this.modalCancleView = true;
			if(params.cancleAction) this.modalCancleAction = params.cancleAction;
		} else {
			this.modalCancleView = false;
			this.modalCancleAction = false;
		}
		if(params.cancleButton)	this.modalCancleButton = params.cancleButton;
		
		if(params.cancleView)this.modalCancleView = true;
		else this.modalCancleView = false;

		if(params.el)this.modalEl = params.el;
		else this.modalEl = false;

		this.showModal=true;
	},
	dialogClose() {
		var obj = this;
		return function(direction, event) {
			obj.showModal=false;
			if(obj.modalCancleAction) {
				obj.modalCancleAction();
			}
		}
		
	},
	
	dialogDoAction() {
		var obj = this;
		obj.showModal=false;
		if(obj.modalDoAction) {
			obj.modalDoAction();
			
		}
	}
	
	/*
	dialogDoAction() {
		var obj = this;
		return function(direction, event) {
		
			obj.showModal=false;
			//if(this.modalEl)this.$eventBus.$emit('failAction',this.modalEl);
			if(obj.modalDoAction) {
				eval(obj.modalDoAction());
				//this.$eventBus.$emit(this.modalDoAction);
			}
		}
	}
	*/
  },
  updated() {
	 $('.modal-mask').css('height',$(window).height());
  }
}
</script>


<style lang="scss" scoped>
 
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;

}

.modal-header h3 {
  margin-top: 0;
  color: #000;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  text-align:center;
  width:100%;
  margin:auto;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}



</style>