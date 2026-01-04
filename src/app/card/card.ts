import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type User = {
  name: string;
  age: number;
  img: string;
  gender: 'male' | 'female' | 'non-binary';
  role: 'tank' | 'dps' | 'support';
  level: number;
  region: 'NA' | 'EU' | 'ASIA';
};

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class CardComponent {
  @Input({ required: true }) user!: User;
  @Output() swipe = new EventEmitter<'left' | 'right'>();
  @Output() dragProgress = new EventEmitter<number>(); // -1 = left, 1 = right

  x = 0;
  y = 0;
  startX = 0;
  startY = 0;
  isDragging = false;

  threshold = 120; // horizontal distance to trigger swipe

  // ----------------------
  // Mouse support
  // ----------------------
  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.startDrag(e.clientX, e.clientY);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e: MouseEvent) => this.dragTo(e.clientX, e.clientY);

  onMouseUp = () => this.endDrag();

  // ----------------------
  // Touch support
  // ----------------------
  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    const touch = e.touches[0];
    this.startDrag(touch.clientX, touch.clientY);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    e.preventDefault(); // prevent scrolling while dragging
    const touch = e.touches[0];
    this.dragTo(touch.clientX, touch.clientY);
  }

  @HostListener('touchend')
  onTouchEnd() {
    this.endDrag();
  }

  // ----------------------
  // Shared drag logic
  // ----------------------
  startDrag(clientX: number, clientY: number) {
    this.isDragging = true;
    this.startX = clientX - this.x;
    this.startY = clientY - this.y;
  }

  dragTo(clientX: number, clientY: number) {
    if (!this.isDragging) return;

    this.x = clientX - this.startX;
    this.y = clientY - this.startY;

    // Emit normalized progress (-1 to 1)
    const maxDistance = 200; // max drag considered for flash
    let progress = this.x / maxDistance;
    progress = Math.max(Math.min(progress, 1), -1); // clamp -1..1
    this.dragProgress.emit(progress);
  }

  endDrag() {
    this.isDragging = false;

    // Trigger swipe if threshold exceeded
    if (this.x > this.threshold) this.swipe.emit('right');
    else if (this.x < -this.threshold) this.swipe.emit('left');

    // Reset position smoothly
    this.x = 0;
    this.y = 0;

    // Remove mouse listeners if they exist
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  // ----------------------
  // Style for transform
  // ----------------------
  get style() {
    const rotate = this.x / 20;
    return {
      transform: `translate(${this.x}px, ${this.y}px) rotate(${rotate}deg)`,
      transition: this.isDragging ? 'none' : 'transform 0.3s ease',
    };
  }

  get meta() {
    return [
      this.user.gender,
      this.user.role.toUpperCase(),
      `Lv ${this.user.level}`,
      this.user.region,
    ];
  }
}
