import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './index.tsx';
import { vi, describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock de l'importation du fichier SVG
vi.mock('@assets/icon-spaceship.svg?react', () => ({
  default: 'svg',
}));

describe('Cockpit header component', () => {
  it('should navigate to spaceship-admin page when the button is clicked', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    const button = screen.getByText(/Spaceship admin/i);
    fireEvent.click(button);
    expect(window.location.pathname).toBe('/spaceship-admin');
  });
});
