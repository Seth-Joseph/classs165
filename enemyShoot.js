AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {
        //Addressing enemies using class name.
        var els = document.querySelectorAll('.enemy');
        
        for(var i = 0; i < els.length; i++){
            var enemyBullet = document.createElement('a-entity');
            
            enemyBullet.setAttribute('gemoetry',{
                primitive:'sphere',
                radius:0.5
            });
            var position = els[i].getAttribute('position');

            enemyBullet.setAttribute('material','color','#000');
            enemyBullet.setAttribute('position',{x:position.x+1.5, y:position.y+3, z:position.z});

            var sceneEl = document.querySelector("#scene");
            sceneEl.appendChild(enemyBullet);

            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            //shooting direction.
            var enemy = els[i].object3D;
            var player = document.querySelector('#weapon').object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            //velocity and direction
            var direction = new THREE.Vector3();
            direction.subVectors(position1,position2).normalize();
            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));

            //set the enemyBullet as the dynamic entity
            enemyBullet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
            });
            
            var element = document.querySelector('#countLife');
            var playerLife = parseInt(element.getAttribute('text').value);
            console.log(playerLife);

            //add the collide event listener to the enemyBullet
            enemyBullet.addEventListener("collide", function(e){
                if(e.detail.body.el.id === "weapon"){
                    if(playerLife > 0){
                        playerLife = playerLife-1;
                        element.setAttribute('text',{
                            value:playerLife
                        });
                    }
                    if(playerLife <= 0){
                        var gameOvermsg = document.querySelector('#over');
                        gameOvermsg.setAttribute('visible',true);

                        var tankEl = document.querySelectorAll('.enemy');
                        
                        for(var i =0;i < tankEl.length; i++){
                            sceneEl.removeChild(tankEl[i]);
                        }
                    }

                }
            });
        };
    },

});